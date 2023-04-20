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
          profile_id: number | null
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
          profile_id?: number | null
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
          profile_id?: number | null
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string | null
        }
      }
      articles_tags: {
        Row: {
          article_id: number
          tag_id: number
        }
        Insert: {
          article_id: number
          tag_id: number
        }
        Update: {
          article_id?: number
          tag_id?: number
        }
      }
      comments: {
        Row: {
          article_id: number
          auth_id: string
          body: string
          profile_id: number
        }
        Insert: {
          article_id: number
          auth_id: string
          body: string
          profile_id: number
        }
        Update: {
          article_id?: number
          auth_id?: string
          body?: string
          profile_id?: number
        }
      }
      favorites: {
        Row: {
          article_id: number
          auth_id: string
          profile_id: number
        }
        Insert: {
          article_id: number
          auth_id: string
          profile_id: number
        }
        Update: {
          article_id?: number
          auth_id?: string
          profile_id?: number
        }
      }
      followings: {
        Row: {
          auth_id: string | null
          followed_id: number
          follower_id: number
        }
        Insert: {
          auth_id?: string | null
          followed_id: number
          follower_id: number
        }
        Update: {
          auth_id?: string | null
          followed_id?: number
          follower_id?: number
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
