# Mitzvot API

This project facilitates the searching through the 613 mitzvot & sections of the Tanakh, AI summaries for daily Mitzvot completion, and more.

Accessible at: https://web-production-aae7.up.railway.app/

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

The server will start on port 3000.

### Testing

Generate a unit test report:

    npx jest

Resulting in a coverage report, looking like:

<img width="633" alt="Screenshot 2025-01-22 at 14 00 01" src="https://github.com/user-attachments/assets/919accdf-918b-4c28-8366-5f59d9fed0a6" />


# Documentation:

## Usage

- 100 requests per hour for non AI endpoints.
- 20 requests per hour for AI endpoints.
- Usage is IP-based.

## API Endpoints

### Get All Mitzvot

- **URL:** `/api/mitzvot/all`
- **Method:** `GET`
- **Description:** Returns all mitzvot.

#### Response:
```json
[
    {
        "number": 1,
        "description": "To know there is a God.",
        "source": "Exodus 20:2"
    },
    ...
]
```

### Search Mitzvah by Description using AI

- **URL:** `/api/mitzvot/ai/search`
- **Method:** `GET`
- ** Query parameters:** q (required): The query string to search in the description.
- **Description:** Searches for mitzvot by description using AI to figure out what is meant. Example response below, based on "/api/mitzvot/ai/search?q=food":

#### Response:
```json
[
    {
        "description": "Preparing and eating a meal",
        "potentialMitzvah": "Birkat Hamazon (Grace After Meals)"
    },
    {
        "description": "Acquiring food",
        "potentialMitzvah": "Avoiding theft or deception in food transactions; ensuring fair prices and honest dealings."
    }...
]
```

### Search Mitzvah by Description using Mitzvot list.

- **URL:** `/api/mitzvot/search`
- **Method:** `GET`
- ** Query parameters:** q (required): The query string to search in the description.
- **Description:** Searches for mitzvot by description..

#### Response:
```json
[
    {
        "number": 1,
        "description": "To know there is a God.",
        "source": "Exodus 20:2"
    },
    ...
]
```

### Search Mitzvot by Source

- **URL:** `/api/mitzvot/source`
- **Method:** `GET`
- ** Query parameters:** source (required): The query string to search in the source.
- **Description:** Searches for mitzvot by source.

#### Response:
```json
[
    {
        "number": 1,
        "description": "To know there is a God.",
        "source": "Exodus 20:2"
    },
    ...
]
```

### Random part from the Tanakh

- **URL:** `/api/tanakh/random`
- **Method:** `GET`
- **Description:** Provides a random section from the Tanakh, alongisde the book it comes from.

#### Response:
```json
    {
      "book": "Lamentations",
      "line": "חשב יהוה להשחית חומת בת ציון נטה קו לא השיב ידו מבלע ויאבל חל וחומה יחדו אמללו"
    }
```
### Random part from the Tanakh (ENGLISH)

- **URL:** `/api/tanakh/random/english`
- **Method:** `GET`
- **Description:** Provides a random section from the Tanakh, alongisde the book it comes from, this time with English included.

#### Response:
```json
    {
        "book": "Judges",
        "line": "והיה בבקר כזרח השמש תשכים ופשטת על העיר והנה הוא והעם אשר אתו יצאים אליך ועשית לו כאשר תמצא ידך",
        "english": "And there was the east cattle the sun and simplified on the city and here he and the people with whom he will come to you and you did to him when you find your hand"
    }
```

### AI Mitzvot summary for the day.

- **URL:** `/api/mitzvot/ai`
- **Method:** `GET`
- **Description:** Based on an explanation of the activities you have completed in a day, Google Gemini AI will act as a Rabbi and return the list of Mitzvot completed (if any), in a JSON format.

#### Input (JSON request body):
```json
    {
        "prompt": "Said the Shema"
    }
```

#### Response:
```json
    {
        "mitzvotForToday": ["Shema"],
        "mitzvotCount": 1
    }
```

### AI Mitzvot Explanation

- **URL:** `/api/mitzvot/ai/explain/:id`
- **Method:** `GET`
- **Description:** Based on a Mitzvah ID, these can be found by searching the mitzvot in our API or by using the official order of Mitzvot found on Chabad.org, we return an AI explanation for the Mitzvah. An example call would be to the endpoint: /api/mitzvot/ai/explain/4 - this would return an explanation and mitzvah name for the fourth mitzvah in the list, responding with:

#### Response:
```json
    {
        "mitzvahName": "Ahavat Hashem (Love of God)",
        "explanation": "Ahavat Hashem, the love of God, is the foundation of all mitzvot. It's not merely an emotion, but a commitment expressed through actions reflecting reverence, awe, obedience to His commandments (mitzvot), and striving to emulate His divine attributes – chesed (loving-kindness), tzedek (justice), and rachamim (compassion).  This love is cultivated through Torah study, prayer, and living a righteous life according to Halakha (Jewish law).  It's a constant, evolving relationship, characterized by both intellectual understanding and deep emotional connection, ultimately leading to a life of meaning and purpose dedicated to serving God and humanity."
    }
```
