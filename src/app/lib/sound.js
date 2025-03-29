import Soundfont from 'soundfont-player';

let audioCtx = null;
let piano = null;

export const initPiano = async () => {
    if (piano) return piano;

    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    piano = await Soundfont.instrument(audioCtx, 'bright_acoustic_piano');

    return piano;
};

const transposeOctaveUp = (note) => {
    const match = note.match(/^([A-G]#?)(\d)$/);
    if (!match) return note;
    const [, pitch, octave] = match;
    return `${pitch}${parseInt(octave) + 1}`;
};

export const playChord = async (notes = []) => {
    const piano = await initPiano();

    const now = audioCtx.currentTime;

    notes.forEach(note => {
        const higherNote = transposeOctaveUp(note);
        piano.play(higherNote, now, { duration: 2 });
    });
};
