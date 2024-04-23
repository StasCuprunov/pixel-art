let head = {
    "title": "Pixel Art"
}

let introduction = {
    "title": "Pixel Art",
    "paragraph": "Auf dieser Webseite kannst du deine eigene Pixelkunstwerte erstellen!"
};

let tips = {
    "title": "Tipps",
    "paragraph": "Falls die Pixel zu klein oder zu groß sind, dann kannst in deinem Browser hinein- bzw. hinauszoomen " +
        "und anschließend alle Pixel zurücksetzen."
}

let tools = {
  "title" : "Werkzeuge, um dein Bild zu erstellen",
    "gridSize" : {
      "label": "Welche quadratische Pixelgröße soll dein Bild haben?"
    },
    "adjustPixelSize": {
      "label": "Wie groß sollen die einzelne Pixeln in Einheiten sein?"
    },
    "pixelColor": {
      "label": "Mit welcher Farbe möchtest du färben?"
    },
    "fill": {
      "label": "Möchtest du deine benachbarten Pixel mit den angeklickten Pixel im Bild färben?"
    },
    "reset": {
      "label": "Ich möchte alle Pixel zurücksetzen",
      "buttonText": "Zurücksetzen"
    }
};

let createPicture = {
    "title": "Dein Kunstwerk erstellen",
    "download": {
        "fileName": {
            "label": "Gebe den Dateinamen für dein Bild ein"
        },
        "fileType": {
            "label": "Welcher Dateityp soll verwendet werden?"
        },
        "submitText": "Bild herunterladen"
    }
}

let modalReset = {
    "title": "Möchtest du wirklich alle Pixel zurücksetzen?",
    "paragraph": "Alle gefärbten Pixeln werden dabei zurückgesetzt.",
    "reset": {
        "buttonText" : "Zurücksetzen"
    },
    "cancel": {
        "buttonText": "Abbrechen"
    }
}

function templateData() {
    return {
        head,
        introduction,
        tips,
        tools,
        createPicture,
        modalReset
    };
}

module.exports = templateData();