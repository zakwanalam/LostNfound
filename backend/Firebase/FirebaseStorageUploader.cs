using Google.Cloud.Storage.V1;
using System.IO;
using System.Threading.Tasks;

public class FirebaseStorageUploader
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName = "zakwan-alam.appspot.com";

    public FirebaseStorageUploader()
    {
        _storageClient = StorageClient.Create();
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
    {
        if (fileStream == null || fileStream.Length == 0)
            throw new ArgumentException("File stream is null or empty.");

        // Create the metadata for the object being uploaded
        var uploadObject = new Google.Apis.Storage.v1.Data.Object
        {
            Bucket = _bucketName,
            Name = $"uploads/{fileName}",
            ContentType = contentType
        };

        // Use UploadObjectAsync with a valid stream and metadata
        await _storageClient.UploadObjectAsync(
            _bucketName, // Bucket name
            uploadObject.Name, // Object name (including path in the bucket)
            contentType, // Content type of the file
            fileStream // The file stream to upload
        );

        return $"https://storage.googleapis.com/{_bucketName}/uploads/{fileName}";
    }
}
