export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Bookmarks: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string
          url?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
