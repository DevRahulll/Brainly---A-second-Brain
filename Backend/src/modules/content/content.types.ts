enum ContentType {
    youtube = "youtube",
    article = "article",
    document = "document",
    link = "link",
}

export interface IContentInput {
    link: string;
    contentType: ContentType;
    title: string;
    tag: string;
    userId: string;
}
