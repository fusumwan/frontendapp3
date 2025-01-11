export interface TranslationRecord {
  id: string; // Unique identifier for the record
  day: string; // Day in UTC format
  datetime: string; // Full datetime in UTC format
  original_text: string; // Original text to be translated
  from_lang: string; // Source language code (e.g., 'en')
  translated_text: string; // Translated text
  to_lang: string; // Target language code (e.g., 'fr')
  created_at?: string; // Optional: Timestamp when the record was created
  updated_at?: string; // Optional: Timestamp when the record was last updated
  created_by?: string; // Optional: User ID of the record creator
}
