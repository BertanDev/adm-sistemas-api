import { FastifyInstance } from 'fastify'
import fs from 'fs'
import fsp from 'node:fs/promises'
import { api } from '../../lib/axiosInit'
import dayjs from 'dayjs'
import { prismaClient } from '../../lib/PrismaInit'
import {
  GetObjectCommand,
  S3Client,
  ListObjectsCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import Seven from 'node-7z'
import sevenBin from '7zip-bin'
import { exec } from 'node:child_process'

//* * Rota da aws */

export const AwsRoute = async (app: FastifyInstance) => {
  app.get('/aws-route', async (request, reply) => {
    const { userId } = request.query as { userId: string }

    const downloadFile = async (url: string, localPath: string) => {
      try {
        const response = await api({
          url,
          method: 'GET',
          responseType: 'stream',
        })

        // Salvar o arquivo localmente
        await response.data.pipe(fs.createWriteStream(localPath))

        return await new Promise((resolve, reject) => {
          response.data.on('end', () => resolve(''))
          response.data.on('error', (err: string) => reject(err))
        })
      } catch (error) {
        console.error('Erro ao baixar o arquivo:', error)
      }
    }

    const { aws_folder } = (await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        aws_folder: true,
      },
    })) as { aws_folder: string }

    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
      },
    })

    // Listar todos os backups do cliente
    const MMYYYY = dayjs(new Date()).format('MM-YYYY')

    const params = {
      Bucket: 'bkpclientes',
      Prefix: `${MMYYYY}/${aws_folder}/`,
    }

    const objects = new ListObjectsCommand(params)

    console.log(objects)

    const resObjects = await s3Client.send(objects)

    console.log(resObjects)

    let mostRecentObject
    if (resObjects.Contents) {
      // Pega o backup mais recente
      mostRecentObject = resObjects.Contents[resObjects.Contents.length - 1]
    }

    const getObjectURL = async (key: string) => {
      const command = new GetObjectCommand({
        Bucket: 'bkpclientes',
        Key: key,
      })

      const url = await getSignedUrl(s3Client, command)
      return url
    }

    let objectKey = ''
    if (mostRecentObject) {
      objectKey = mostRecentObject.Key as string
    }

    // Pegar a data do backup para salvar no banco
    const match = objectKey.match(/(\d{2}-\d{2}-\d{4}_\d{2}-\d{2}-\d{2})/)
    const dataString = match ? match[1] : null

    // Extrair partes da string de data
    if (dataString) {
      const [day, hours] = dataString.split('_')
      const [dia, mes, ano] = day.split('-')
      const [hora, minuto, segundo] = hours.split('-')

      // Construir a data no formato desejado
      const dataFormatada = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.000Z`

      const finallyDate = new Date(dataFormatada)

      const lastBackup = await prismaClient.user.findFirst({
        where: {
          aws_folder,
        },
        select: {
          last_backup_date: true,
        },
      })

      if (dayjs(lastBackup?.last_backup_date).isSame(finallyDate)) {
        return reply.status(200).send('AWS Route OK! No download')
      }

      await prismaClient.user.updateMany({
        data: {
          last_backup_date: finallyDate,
        },
        where: {
          aws_folder,
        },
      })
    }

    const url = await getObjectURL(objectKey)

    const localPath = `temporaryDatabases/${aws_folder}.7z`

    await downloadFile(url, localPath)
      .then(() => {
        console.log('Arquivo baixado com sucesso!')
      })
      .catch((err) => {
        console.error('Erro:', err)
      })

    await new Promise((resolve) => {
      setTimeout(resolve, 5 * 1000) // Aguarda 5 segundos
    })

    const zipFilePath = `temporaryDatabases/${aws_folder}.7z`
    const extractToPath = `dbs/${aws_folder}`

    const pathTo7zip = sevenBin.path7za

    const myStream = Seven.extractFull(zipFilePath, extractToPath, {
      $bin: pathTo7zip,
    })

    myStream.on('data', (data) => {
      console.log('Data:', data)
    })

    myStream.on('end', () => {
      console.log('Extração concluída com sucesso!')
    })

    myStream.on('error', (err) => {
      console.error('Erro durante a extração:', err)
    })

    await new Promise((resolve) => {
      setTimeout(resolve, 5 * 1000) // Aguarda 5 segundos
    })

    async function copiarArquivo(origem: string, destino: string) {
      try {
        // Lê o conteúdo do arquivo de origem
        const conteudo = await fsp.readFile(origem)

        // Escreve o conteúdo no arquivo de destino
        await fsp.writeFile(destino, conteudo)

        console.log('Arquivo copiado com sucesso!')
      } catch (err) {
        console.error('Erro ao copiar o arquivo:', err)
      }
    }

    await copiarArquivo(
      `dbs/${aws_folder}/DADOS.BKP`,
      `dbs/${aws_folder}/DADOS.FDB`,
    )

    fs.unlink(`dbs/${aws_folder}/DADOS.BKP`, (err) => {
      if (err) {
        console.log('Erro ao excluir BKP: ', err)
      } else {
        console.log('BKP excluído com sucesso')
      }
    })

    // Caminho para a sua pasta
    const pasta = `/home/dashboard-app/adm-sistemas-api/dbs/${aws_folder}`

    // Comando chmod para conceder permissões 777 à pasta
    const comando = `sudo chmod 777 ${pasta}`

    // Executar o comando no sistema operacional
    exec(comando, (erro, stdout, stderr) => {
      if (erro) {
        console.error(`Erro ao executar o comando: ${erro.message}`)
        return
      }
      if (stderr) {
        console.error(`Erro ao executar o comando: ${stderr}`)
        return
      }
      console.log(`Permissões alteradas com sucesso para ${pasta}`)
    })

    return reply.status(200).send('AWS Route OK!' + url)
  })
}
