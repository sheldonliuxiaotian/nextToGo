enum RacingCategory {
  Greyhound = 'Greyhound',
  Harness = 'Harness',
  Horse = 'Horse',
  Unknown = 'Unknown',
}

const RACING_CATEGORIES: { [id: string]: RacingCategory } = {
  '9daef0d7-bf3c-4f50-921d-8e818c60fe61': RacingCategory.Greyhound,
  '161d9be2-e909-4326-8c2c-35ed71fb460b': RacingCategory.Harness,
  '4a2788f8-e825-4d36-9894-efd4baf1cfae': RacingCategory.Horse,
}

const Constants = {
  fontSizeTitle: 32,
  fontSizeRow: 18,
  fontWeightTitle: '700',
  fontWeightRow: '600',
  paddingHorizontal: 20,
  paddingVertical: 10,
}

export {
  RacingCategory,
  RACING_CATEGORIES,
  Constants,
}