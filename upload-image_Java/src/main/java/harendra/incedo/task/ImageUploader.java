package harendra.incedo.task;

import java.io.File;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;

/**
 * 
 * @author Harendra Kumar
 *
 */
public class ImageUploader {
	static AmazonS3 s3Client;
	private final static String CLIENT_REGION = "eu-west-2";
	private final static String BUCKET_NAME = "incdeo-image";

	public static void init() {
		s3Client = AmazonS3ClientBuilder.standard().withRegion(CLIENT_REGION)
				.withCredentials(new ProfileCredentialsProvider()).build();
	}

	public static void main(String[] args) {
		init();
		ImageUploader uploader = new ImageUploader();
		// call the upload method with file name(objectKey) and file path
		uploader.upload("harendra_profile.jpg", "//Users/ijadon/Pictures/Random/profile.jpg");
	}

	/**
	 * For uploading the file in S3
	 * 
	 * @param fileName
	 * @param filePath
	 */
	public void upload(String fileName, String filePath) {
		try {
			PutObjectRequest request = new PutObjectRequest(BUCKET_NAME, fileName, new File(filePath));
			s3Client.putObject(request);
			System.out.println("Image uploaded!");
		} catch (AmazonServiceException serviceException) {
			serviceException.printStackTrace();
		} catch (SdkClientException sdkClientException) {
			sdkClientException.printStackTrace();
		}
	}
}
