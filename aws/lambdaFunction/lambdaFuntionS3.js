import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export const handler = async (event) => {
    // 1. Get the bucket name and file key (name) from the S3 event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    console.log(`New file detected! Bucket: ${bucket}, Key: ${key}`);

    try {
        // 2. Fetch the object from S3
        const response = await s3.send(new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        }));

        // 3. Convert the readable stream to a string
        const bodyContents = await response.Body.transformToString();
        
        console.log("File Contents:", bodyContents);

        return {
            status: 'success',
            message: `Processed file: ${key}`
        };

    } catch (err) {
        console.error("Error reading S3 object:", err);
        throw err;
    }
};