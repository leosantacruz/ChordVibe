import { useState } from "react";

export function useGenerateChords() {
    const [loading, setLoading] = useState(false);

    const fetchChords = async (prompt, onResult) => {
        setLoading(true);
        try {
            const res = await fetch("/api/chords", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error(`Error en la solicitud: ${res.status}`);
            }

            const data = await res.json();
            console.log("Respuesta de /api/chords:", data); // Debug

            if (data.progression && Array.isArray(data.progression)) {
                onResult({
                    title: data.title || "Sin título",
                    progression: data.progression
                });
            } else {
                console.warn("Formato de respuesta no válido:", data);
            }

        } catch (e) {
            console.error("Error generando acordes:", e);
        } finally {
            setLoading(false);
        }
    };

    return { fetchChords, loading };
}
