// app/api/chords/route.js
export async function POST(req) {
    const { prompt } = await req.json();

    const response = await fetch('http://127.0.0.1:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistral:7b',
            stream: false,
            prompt: `
Generame una progresion de acordes que respeten las siguientes reglas

- cantidad maximos acordes: 9
- el modo elegido dependerá del estilo. (ej: medieval seria dorico, clasico seria armonia tonal, billie eilish pop contemporaneo )
- los acordes deberán estar formados por triadas principales (ej: C4-E4-G4 ) y extensiones siempre que el contexto histórico confirme su uso estilistico (ej: musica medieval no contendrá, jazz del siglo 20 sí)
- elije la tensión de los acordes de acuerdo al estilo (ej: blues tiene una tensión A4-C#4-E4-G4)
- completa el titulo y una descripcion, en español
- que tengan la siguiente estructura

{
        "title": "",
        "thumbnail": "9.webp",
        "progression": [
            {
                "name": "Am(add9)",
                "notes": ["A2", "C3", "E3", "B3"]
            },
            {
                "name": "F(add11)",
                "notes": ["F2", "A2", "Bb2", "C3"]
            },
            {
                "name": "Dm(add9)",
                "notes": ["D2", "F2", "A2", "E3"]
            },
            {
                "name": "E7(b9)",
                "notes": ["E2", "G#2", "B2", "D3", "F3"]
            },
            {
                "name": "Dm7b5",
                "notes": ["D2", "F2", "Ab2", "C3"]
            },
            {
                "name": "Fmaj7",
                "notes": ["F2", "A2", "C3", "E3"]
            },
            {
                "name": "Gsus4",
                "notes": ["G2", "C3", "D3"]
            },
            {
                "name": "Am(add9)",
                "notes": ["A2", "C3", "E3", "B3"]
            }
        ],
        "description": "Experience the grandeur with this orchestral ecstasy progression. Big, emotional, and epic, it's perfect for when you want your music to feel larger than life. Prepare for sonic bliss!"
    }


Estilo: ${prompt}
`
        })
    });

    const data = await response.json();
    // Limpiar la respuesta de Ollama
    const cleanedResponse = data.response
        .replace(/\\n/g, "")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\");

    const jsonMatch = cleanedResponse.match(/{[\s\S]*}/);
    if (!jsonMatch) {
        return new Response(JSON.stringify({ error: "No se encontró JSON válido" }), { status: 500 });
    }

    const chords = JSON.parse(jsonMatch[0]);
    return new Response(JSON.stringify(chords), { status: 200, headers: { 'Content-Type': 'application/json' } });
}