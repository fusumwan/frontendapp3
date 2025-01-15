export interface TranslationRecord {
  id: string; // Unique identifier for the record
  originalText: string; // Original text to be translated
  fromLanguage: string; // Source language code (e.g., 'en')
  translatedText: string; // Translated text
  toLanguage: string; // Target language code (e.g., 'fr')
  dayUtc: string; // Full datetime in UTC format
  createdAtUtc?: string; // Optional: Timestamp when the record was created
  createdByUserId?: string; // Optional: User ID of the record creator
}
