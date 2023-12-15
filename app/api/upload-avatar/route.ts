import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const region = process.env.REGION_AWS as string
const accessKeyId = process.env.ACCESS_KEY_ID_AWS as string
const secretAccessKey = process.env.SECRET_KEY_AWS as string
const bucketName = process.env.BUCKET_KEY_AWS as string

async function uploadToS3(fileData: File) {
  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  })

  const fileBuffer = Buffer.from(await fileData.arrayBuffer())

  const putObjectCommand = new PutObjectCommand({
    Body: fileBuffer,
    Bucket: bucketName,
    Key: fileData.name,
  })

  await client.send(putObjectCommand)

  return `https://${bucketName}.s3.${region}.amazonaws.com/${fileData.name}`
}

export async function POST(request: Request) {
  const data = await request.formData()
  const fileData = data.get('file') as File

  try {
    const objectUrl = await uploadToS3(fileData)
    return Response.json({ url: objectUrl })
  } catch (e: any) {
    return Response.json(
      { error: e.Code },
      { status: e.$metadata.httpStatusCode },
    )
  }
}
