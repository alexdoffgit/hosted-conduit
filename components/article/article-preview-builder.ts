export class ArticlePreview {
    public readonly articleDate: string;
    public readonly title: string;
    public readonly description: string;
    public readonly slug: string;
    public readonly username: string;
    public readonly profilePic?: string;
    public readonly favorited: boolean;
    public readonly favoritesCount: number;
    public readonly tags: string[];
  
    public constructor(builder: ArticlePreviewBuilder) {
      this.articleDate = builder.articleDate;
      this.title = builder.title;
      this.description = builder.description;
      this.slug = builder.slug;
      this.username = builder.username;
      this.profilePic = builder.profilePic;
      this.favorited = builder.favorited;
      this.favoritesCount = builder.favoritesCount;
      this.tags = builder.tags;
    }
  
    public static builder(): ArticlePreviewBuilder {
      return new ArticlePreviewBuilder();
    }
  }
  
class ArticlePreviewBuilder {
    public articleDate: string = '';
    public title: string = '';
    public description: string = '';
    public slug: string = '';
    public username: string = '';
    public profilePic?: string = '';
    public favorited: boolean = false;
    public favoritesCount: number = 0;
    public tags: string[] = [];
  
    public withArticleDate(articleDate: string): ArticlePreviewBuilder {
      this.articleDate = articleDate;
      return this;
    }
  
    public withTitle(title: string): ArticlePreviewBuilder {
      this.title = title;
      return this;
    }
  
    public withDescription(description: string): ArticlePreviewBuilder {
      this.description = description;
      return this;
    }
  
    public withSlug(slug: string): ArticlePreviewBuilder {
      this.slug = slug;
      return this;
    }
  
    public withUsername(username: string): ArticlePreviewBuilder {
      this.username = username;
      return this;
    }
  
    public withProfilePic(profilePic?: string): ArticlePreviewBuilder {
      this.profilePic = profilePic;
      return this;
    }
  
    public withFavorited(favorited: boolean): ArticlePreviewBuilder {
      this.favorited = favorited;
      return this;
    }
  
    public withFavoritesCount(favoritesCount: number): ArticlePreviewBuilder {
      this.favoritesCount = favoritesCount;
      return this;
    }
  
    public withTags(tags: string[]): ArticlePreviewBuilder {
      this.tags = tags;
      return this;
    }
  
    public build(): ArticlePreview {
      return new ArticlePreview(this);
    }
  }
  