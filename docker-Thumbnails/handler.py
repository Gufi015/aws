import json
import boto3
import cStringIO
from PIL import Image, ImageOps
import os


s3 = boto3.client('s3')
size = int(os.environ['Image_size'])


def generate_image_s3(event, context):
    print(event)

    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    image = get_s3_image(bucket, key)

    thumb = image_to_thumb(image)
    thumb_key = new_filename(key)

    url = upload_to_s3(bucket, thumb_key, thumb)

    return url


def get_s3_image(bucket, key):

    response = s3.get_object(Bucket=bucket, Key=key)
    imagecontent = response['body'].read()

    file = cStringIO.StringIO(imagecontent)
    img = Image.open(file)

    return img


def image_to_thumb(image):
    return ImageOps.fit(image, (size, size), Image.ANTIALIAS)


def new_filename(key):
    key_split = key.rsplit('.', 1)
    return key_split + "_thumbnail.png"


def upload_to_s3(bucket, key, image):

    out_thumb = cStringIO.StringIO()

    image.save(out_thumb, 'PNG')

    out_thumb.seek(0)

    response = s3.put_object(
        ACL='public-read',
        Body=out_thumb,
        Bucket=bucket,
        ContentType='image/png',
        Key=key
    )

    print(response)

    url = '{}/{}/{}'.format(s3.meta.endpoint_url, bucket, key)

    return url
