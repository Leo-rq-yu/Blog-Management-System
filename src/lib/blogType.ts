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
      "id": "-0quBl4snX",
      "type": "image",
      "data": {
        "url": "https://aristai-static-resources.s3.us-east-2.amazonaws.com/assets/newsroom/f7c9790b3139a8f22c06ff0740241f64.png",
        "caption": "This is a caption",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
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
  cover_image_url: "https://s3-alpha-sig.figma.com/img/4d6d/099b/786a96cc99325729ea6e40300fed3ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mlnVhE3nQJmXa4XgRIXstO7XTUqLjOeBcdR2tPGjnDwBGg9EAvUOThTyf~AwufMRBQ8mW3~P-dTJUfS0mRGvuv0gwMBw0dymK2XT~85hkQOtkjA6r6VDIGUcGB1bsFAO4L6LFPrv9O1ehq65FHdSKEAQVg~BXcFg2gF2k1MSfJnxUdn2QiPWzm9Wz93yEsNb23eCZqHykoVGGBU6DM7cMPEJ3Fpys~rSAzN8jJWhjpLO0TuYY4P8Rhq-i-lNZyU9bC3OGxoPYlQPIt8qKVyAwCp61qtGPPDQw-ukw4n80b86s2T6aUgVLvM~K~ura~XKzxbo480axFg3mY0Ncy6Hbg__",
  description:
    "This is an example card showing how your blogs will appear once you create them.",
  created_at: "2025-03-19T00:00:00.000Z",
  updated_at: "2025-03-19T00:00:00.000Z",
  published_at: null,
  blocks: DEFAULT_BLOG_CONTENT.blocks,
};