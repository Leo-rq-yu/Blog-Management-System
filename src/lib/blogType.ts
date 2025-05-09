/* eslint-disable @typescript-eslint/no-explicit-any */
type Block = {
  id?: string;
  type: string;
  data: any;
}

export interface Blog {
  id: string;
  title: string;
  author: string | null;
  tag: string;
  status: "draft" | "published";
  description: string | null;
  keywords: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  blocks?: Block[];
}

export const DEFAULT_BLOG_CONTENT: { blocks: Block[] } = {
  blocks: [
    {
      "id": "YbsnLpDDOa",
      "type": "header",
      "data": {
        "text": "This is header 1",
        "level": 1
      }
    },
    {
      "id": "IZfLiXnsy_",
      "type": "header",
      "data": {
        "text": "This is header 2",
        "level": 2
      }
    },
    {
      "id": "LHfXaloDWZ",
      "type": "header",
      "data": {
        "text": "This is header 3",
        "level": 3
      }
    },
    {
      "id": "pFUxO03RVl",
      "type": "paragraph",
      "data": {
        "text": "This is a paragraph"
      }
    },
    {
      "id": "M02YJpGMjY",
      "type": "paragraph",
      "data": {
        "text": "<i>This is an italic paragraph</i>"
      }
    },
    {
      "id": "05v-5ByFBo",
      "type": "paragraph",
      "data": {
        "text": "<b>This is a bold paragraph</b>"
      }
    },
    {
      "id": "RDeidRdBCN",
      "type": "paragraph",
      "data": {
        "text": "This is an underline paragraph"
      }
    },
    {
      "id": "JNQvfePe7T",
      "type": "paragraph",
      "data": {
        "text": "This is a text with anchor <a href=\"https://google.com\">Google</a>"
      }
    },
    {
      "id": "SIUoqYsvke",
      "type": "paragraph",
      "data": {
        "text": "Here is an example of ordered list:"
      }
    },
    {
      "id": "YBDp3GZNoc",
      "type": "list",
      "data": {
        "style": "ordered",
        "meta": {
          "counterType": "numeric"
        },
        "items": [
          {
            "content": "Item 1",
            "meta": {},
            "items": []
          },
          {
            "content": "Item 2",
            "meta": {},
            "items": []
          }
        ]
      }
    },
    {
      "id": "V16H_JDnLS",
      "type": "paragraph",
      "data": {
        "text": "Here is an example of unordered list:"
      }
    },
    {
      "id": "DmyljWOMR9",
      "type": "list",
      "data": {
        "style": "unordered",
        "meta": {},
        "items": [
          {
            "content": "Item 1",
            "meta": {},
            "items": []
          },
          {
            "content": "Item 2 with nested list",
            "meta": {},
            "items": [
              {
                "content": "Nested item 1",
                "meta": {},
                "items": []
              }
            ]
          }
        ]
      }
    },
    {
      "id": "ESaPxAu386",
      "type": "paragraph",
      "data": {
        "text": "Here is an example of nested ordered list with custom counter type:"
      }
    },
    {
      "id": "iW55L0HmoK",
      "type": "list",
      "data": {
        "style": "ordered",
        "meta": {
          "start": 2,
          "counterType": "upper-roman"
        },
        "items": [
          {
            "content": "Item 1",
            "meta": {},
            "items": [
              {
                "content": "Nested item 1",
                "meta": {},
                "items": [
                  {
                    "content": "Nested-nested item 1",
                    "meta": {},
                    "items": []
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "id": "vCz_NIjw6Y",
      "type": "list",
      "data": {
        "style": "checklist",
        "meta": {},
        "items": [
          {
            "content": "This is a checklist item",
            "meta": {
              "checked": false
            },
            "items": [
              {
                "content": "This is a checked nested item",
                "meta": {
                  "checked": true
                },
                "items": []
              }
            ]
          }
        ]
      }
    },
    {
      "id": "BjOdUVLlK3",
      "type": "image",
      "data": {
        "caption": "This is a caption",
        "withBorder": false,
        "withBackground": false,
        "stretched": false,
        "file": {
          "url": "https://aristai-static-resources.s3.us-east-2.amazonaws.com/assets/newsroom/images/13666adb-ff56-4d13-af29-6a713b0740a1.png"
        }
      }
    },
    {
      "id": "MSS5PzkPd9",
      "type": "quote",
      "data": {
        "text": "This is a quote",
        "caption": "",
        "alignment": "left"
      }
    },
    {
      "id": "o4BBd_hEss",
      "type": "code",
      "data": {
        "code": "console.log('Hello, World!')"
      }
    },
    {
      "id": "MZAHLVaGX2",
      "type": "table",
      "data": {
        "withHeadings": true,
        "stretched": false,
        "content": [
          [
            "Column1",
            "Column2"
          ],
          [
            "row1-1",
            "row1-2"
          ],
          [
            "row2-1",
            "row2-2"
          ]
        ]
      }
    }
  ]
};

export const DEFAULT_BLOG: Blog = {
  id: "example",
  title: "Example Blog",
  author: "Leo",
  tag: "example",
  status: "draft",
  keywords: null,
  cover_image_url: "https://d43vvod2st23c.cloudfront.net/786a96cc99325729ea6e40300fed3ab3.jpg",
  description:
    "This is an example card showing how your blogs will appear once you create them.",
  created_at: "2025-03-19T00:00:00.000Z",
  updated_at: "2025-03-19T00:00:00.000Z",
  published_at: null,
  blocks: DEFAULT_BLOG_CONTENT.blocks,
};