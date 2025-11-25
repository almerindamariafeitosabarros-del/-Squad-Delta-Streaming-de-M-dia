const readline = require("readline");

// ----------- LISTA DUPLAMENTE ENCADEADA -----------

class Node {
    constructor(music) {
        this.music = music;
        this.prev = null;
        this.next = null;
    }
}

class Playlist {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    addMusic(music) {
        const newNode = new Node(music);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
            return console.log(`🎵 Adicionada: ${music}`);
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

        console.log(`🎵 Adicionada: ${music}`);
    }

    next() {
        if (!this.current) return console.log("Playlist vazia!");

        this.current = this.current.next || this.head; 
        console.log("▶️ Tocando agora:", this.current.music);
    }

    prev() {
        if (!this.current) return console.log("Playlist vazia!");

        this.current = this.current.prev || this.tail;
        console.log("⏪ Tocando agora:", this.current.music);
    }

    removeMusic(music) {
        let temp = this.head;

        while (temp && temp.music !== music) {
            temp = temp.next;
        }

        if (!temp) return console.log(`❌ Música "${music}" não encontrada.`);

        if (temp === this.head && temp === this.tail) {
            this.head = null;
            this.tail = null;
            this.current = null;
        } else {
            if (temp.prev) temp.prev.next = temp.next;
            else this.head = temp.next;

            if (temp.next) temp.next.prev = temp.prev;
            else this.tail = temp.prev;

            if (this.current === temp)
                this.current = temp.next || temp.prev;
        }

        console.log(`🗑 Música removida: ${music}`);
    }

    showPlaylist() {
        let temp = this.head;
        let list = [];

        while (temp) {
            list.push(temp.music);
            temp = temp.next;
        }

        console.log("📜 Playlist:", list.join(" -> "));
    }
}

// ----------- INTERAÇÃO COM O USUÁRIO -----------

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const playlist = new Playlist();

console.log("\n🎶 PLAYLIST INTERATIVA");
console.log("Comandos: add, next, prev, remove, show, exit\n");

function esperarComando() {
    rl.question("👉 Digite um comando: ", (cmd) => {
        const [comando, ...resto] = cmd.split(" ");
        const argumento = resto.join(" ");

        switch (comando.toLowerCase()) {
            case "add":
                if (!argumento) console.log("Use: add NomeDaMúsica");
                else playlist.addMusic(argumento);
                break;

            case "next":
                playlist.next();
                break;

            case "prev":
                playlist.prev();
                break;

            case "remove":
                if (!argumento) console.log("Use: remove NomeDaMúsica");
                else playlist.removeMusic(argumento);
                break;

            case "show":
                playlist.showPlaylist();
                break;

            case "exit":
                console.log("👋 Encerrando...");
                rl.close();
                return;

            default:
                console.log("❓ Comando inválido!");
        }

        esperarComando(); // repetir
    });
}

esperarComando();
