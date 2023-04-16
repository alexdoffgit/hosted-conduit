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
      articles: {
        Row: {
          author_id: string | null
          body: string
          created_at: string | null
          description: string | null
          id: number
          published: boolean
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string | null
          description?: string | null
          id?: number
          published?: boolean
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string | null
          description?: string | null
          id?: number
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string | null
        }
      }
      articles_tags: {
        Row: {
          article_id: number | null
          id: number
          tag_id: number | null
        }
        Insert: {
          article_id?: number | null
          id?: number
          tag_id?: number | null
        }
        Update: {
          article_id?: number | null
          id?: number
          tag_id?: number | null
        }
      }
      comments: {
        Row: {
          article_id: number | null
          author_id: string | null
          body: string
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          article_id?: number | null
          author_id?: string | null
          body: string
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          article_id?: number | null
          author_id?: string | null
          body?: string
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
      }
      favorites: {
        Row: {
          article_id: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          article_id?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          article_id?: number | null
          id?: number
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          auth_id: string | null
          bio: string | null
          id: number
          image: string | null
          username: string
        }
        Insert: {
          auth_id?: string | null
          bio?: string | null
          id?: number
          image?: string | null
          username: string
        }
        Update: {
          auth_id?: string | null
          bio?: string | null
          id?: number
          image?: string | null
          username?: string
        }
      }
      tags: {
        Row: {
          id: number
          tag_name: string
        }
        Insert: {
          id?: number
          tag_name: string
        }
        Update: {
          id?: number
          tag_name?: string
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
