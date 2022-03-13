export const config = {
  'dev': {
    'username': 'postgres',
    'password': 'willrein',
    'database': 'postgres',
    'host': 'udagram-db-dev.ciw8mjmjhmbz.us-east-1.rds.amazonaws.com',
    'dialect': 'postgres',
    'aws_region': 'us-east-1',
    'aws_profile': 'default',
    'aws_media_bucket': 'udagram-dev-390910967849'
  },
  'prod': {
    'username': '',
    'password': '',
    'database': 'udagram_prod',
    'host': '',
    'dialect': 'postgres'
  }
};
