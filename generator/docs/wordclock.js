//Copyright timeanddate.com 2021, do not use without permission
var siteCountry = (window.TAD && window.TAD.co) || "uk",
  defaultLangCode = { uk: "english", no: "norwegian", de: "german" }[
    siteCountry
  ],
  wordclock = {
    MAX_BIN_LENGTH: 12,
    lang: {
      english: {
        name: "English",
        words: [
          ["IT IS"],
          ["QUARTER", "TWENTY", "HALF"],
          ["TEN", "FIVE"],
          ["PAST", "TO"],
          "TWELVE ONE TWO THREE FOUR FIVE SIX SEVEN EIGHT NINE TEN ELEVEN".split(
            " "
          ),
          ["O'CLOCK"],
        ],
        rules: [
          [1, 0, 0, 0, 0, 1],
          [1, 0, 2, 1, 0, 0],
          [1, 0, 1, 1, 0, 0],
          [1, 1, 0, 1, 0, 0],
          [1, 2, 0, 1, 0, 0],
          [1, 2, 2, 1, 0, 0],
          [1, 3, 0, 1, 0, 0],
          [1, 2, 2, 2, 1, 0],
          [1, 2, 0, 2, 1, 0],
          [1, 1, 0, 2, 1, 0],
          [1, 0, 1, 2, 1, 0],
          [1, 0, 2, 2, 1, 0],
        ],
        hourRule: 4,
      },
      norwegian: {
        name: "Norwegian",
        words: [
          ["KLOKKA ER"],
          ["KVART"],
          ["TI", "FEM"],
          ["OVER", "P\u00c5"],
          ["HALV"],
          "TOLV ETT TO TRE FIRE FEM SEKS SYV \u00c5TTE NI TI ELLEVE".split(" "),
        ],
        rules: [
          [1, 0, 0, 0, 0, 0],
          [1, 0, 2, 1, 0, 0],
          [1, 0, 1, 1, 0, 0],
          [1, 1, 0, 1, 0, 0],
          [1, 0, 1, 2, 1, 1],
          [1, 0, 2, 2, 1, 1],
          [1, 0, 0, 0, 1, 1],
          [1, 0, 2, 1, 1, 1],
          [1, 0, 1, 1, 1, 1],
          [1, 1, 0, 2, 0, 1],
          [1, 0, 1, 2, 0, 1],
          [1, 0, 2, 2, 0, 1],
        ],
        hourRule: 5,
      },
      danish: {
        name: "Danish",
        words: [
          ["KLOKKEN ER"],
          ["FEM", "TI", "KVART", "TYVE", "FEMOGTYVE"],
          ["OVER", "I", "HALV"],
          "TOLV ET TO TRE FIRE FEM SEKS SYV OTTE NI TI ELLEVE".split(" "),
        ],
        rules: [
          [1, 0, 0, 0],
          [1, 1, 1, 0],
          [1, 2, 1, 0],
          [1, 3, 1, 0],
          [1, 4, 1, 0],
          [1, 5, 1, 0],
          [1, 0, 3, 1],
          [1, 5, 2, 1],
          [1, 4, 2, 1],
          [1, 3, 2, 1],
          [1, 2, 2, 1],
          [1, 1, 2, 1],
        ],
        hourRule: 3,
      },
      swedish: {
        name: "Swedish",
        words: [
          ["KLOCKAN \u00c4R"],
          ["FEM", "TIO", "KVART", "TJUGO"],
          ["\u00d6VER", "I"],
          ["HALV"],
          "TOLV ETT TV\u00c5 TRE FYRA FEM SEX SJU \u00c5TTA NIO TIO ELVA".split(
            " "
          ),
        ],
        rules: [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 0, 0],
          [1, 2, 1, 0, 0],
          [1, 3, 1, 0, 0],
          [1, 4, 1, 0, 0],
          [1, 1, 2, 1, 1],
          [1, 0, 0, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 4, 2, 0, 1],
          [1, 3, 2, 0, 1],
          [1, 2, 2, 0, 1],
          [1, 1, 2, 0, 1],
        ],
        hourRule: 4,
      },
      german: {
        name: "German",
        words: [
          ["ES IST"],
          ["VIERTEL", "ZWANZIG", "EIN"],
          ["ZEHN", "F\u00dcNF"],
          ["NACH", "VOR"],
          ["HALB"],
          "ZW\u00d6LF EINS ZWEI DREI VIER F\u00dcNF SECHS SIEBEN ACHT NEUN ZEHN ELF".split(
            " "
          ),
          ["UHR"],
        ],
        rules: [
          [1, 0, 0, 0, 0, 0, 1],
          [1, 0, 2, 1, 0, 0, 0],
          [1, 0, 1, 1, 0, 0, 0],
          [1, 1, 0, 1, 0, 0, 0],
          [1, 2, 0, 1, 0, 0, 0],
          [1, 0, 2, 2, 1, 1, 0],
          [1, 0, 0, 0, 1, 1, 0],
          [1, 0, 2, 1, 1, 1, 0],
          [1, 2, 0, 2, 0, 1, 0],
          [1, 1, 0, 2, 0, 1, 0],
          [1, 0, 1, 2, 0, 1, 0],
          [1, 0, 2, 2, 0, 1, 0],
        ],
        exception: { "01:00": [1, 3, 0, 0, 0, -1, 1] },
        hourRule: 5,
      },
      french: {
        name: "French",
        words: [
          ["IL EST"],
          "DOUZE UNE DEUX TROIS QUATRE CINQ SIX SEPT HUIT NEUF DIX ONZE".split(
            " "
          ),
          ["HEURE"],
          ["MOINS"],
          ["LE", "ET"],
          "CINQ DIX QUART VINGT VINGT-CINQ DEMIE".split(" "),
        ],
        rules: [
          [1, 0, 1, 0, 0, 0],
          [1, 0, 1, 0, 0, 1],
          [1, 0, 1, 0, 0, 2],
          [1, 0, 1, 0, 2, 3],
          [1, 0, 1, 0, 0, 4],
          [1, 0, 1, 0, 0, 5],
          [1, 0, 1, 0, 2, 6],
          [1, 1, 1, 1, 0, 5],
          [1, 1, 1, 1, 0, 4],
          [1, 1, 1, 1, 1, 3],
          [1, 1, 1, 1, 0, 2],
          [1, 1, 1, 1, 0, 1],
        ],
        hourRule: 1,
        plural: { rule: [2, 0], append: "S" },
      },
      italian: {
        name: "Italian",
        words: [
          ["\u00c8", "SONO LE"],
          "MEZZOGIORNO L\u2019UNA DUE TRE QUATTRO CINQUE SEI SETTE OTTO NOVE DIECI UNDICI MEZZANOTTE".split(
            " "
          ),
          ["E", "MENO"],
          "CINQUE;DIECI;UN QUARTO;VENTI;VENTICINQUE;MEZZO".split(";"),
        ],
        rules: [
          [2, 0, 0, 0],
          [2, 0, 1, 1],
          [2, 0, 1, 2],
          [2, 0, 1, 3],
          [2, 0, 1, 4],
          [2, 0, 1, 5],
          [2, 0, 1, 6],
          [2, 1, 2, 5],
          [2, 1, 2, 4],
          [2, 1, 2, 3],
          [2, 1, 2, 2],
          [2, 1, 2, 1],
        ],
        hourRule: 1,
        midnight: !0,
        exception: {
          "11:35": [1, 1, 2, 5],
          "11:40": [1, 1, 2, 4],
          "11:45": [1, 1, 2, 3],
          "11:50": [1, 1, 2, 2],
          "11:55": [1, 1, 2, 1],
          "00:00": [1, 0, 0, 0],
          "00:05": [1, 0, 1, 1],
          "00:10": [1, 0, 1, 2],
          "00:15": [1, 0, 1, 3],
          "00:20": [1, 0, 1, 4],
          "00:25": [1, 0, 1, 5],
          "00:30": [1, 0, 1, 6],
          "00:35": [1, 1, 2, 5],
          "00:40": [1, 1, 2, 4],
          "00:45": [1, 1, 2, 3],
          "00:50": [1, 1, 2, 2],
          "00:55": [1, 1, 2, 1],
          "01:00": [1, 0, 0, 0],
          "01:05": [1, 0, 1, 1],
          "01:10": [1, 0, 1, 2],
          "01:15": [1, 0, 1, 3],
          "01:20": [1, 0, 1, 4],
          "01:25": [1, 0, 1, 5],
          "01:30": [1, 0, 1, 6],
        },
        maxBinSize: 14,
      },
      spanish: {
        name: "Spanish",
        words: [
          ["ES LA", "SON LAS"],
          "DOCE UNA DOS TRES CUATRO CINCO SEIS SIETE OCHO NUEVE DIEZ ONCE".split(
            " "
          ),
          ["Y", "MENOS"],
          "CINCO DIEZ CUARTO VEINTE VEINTICINCO MEDIA".split(" "),
          ["EN PUNTO"],
        ],
        rules: [
          [2, 0, 0, 0, 1],
          [2, 0, 1, 1, 0],
          [2, 0, 1, 2, 0],
          [2, 0, 1, 3, 0],
          [2, 0, 1, 4, 0],
          [2, 0, 1, 5, 0],
          [2, 0, 1, 6, 0],
          [2, 1, 2, 5, 0],
          [2, 1, 2, 4, 0],
          [2, 1, 2, 3, 0],
          [2, 1, 2, 2, 0],
          [2, 1, 2, 1, 0],
        ],
        hourRule: 1,
        exception: {
          "01:00": [1, 0, 0, 0, 1],
          "01:05": [1, 0, 1, 1, 0],
          "01:10": [1, 0, 1, 2, 0],
          "01:15": [1, 0, 1, 3, 0],
          "01:20": [1, 0, 1, 4, 0],
          "01:25": [1, 0, 1, 5, 0],
          "01:30": [1, 0, 1, 6, 0],
          "00:35": [1, 1, 2, 5, 0],
          "00:40": [1, 1, 2, 4, 0],
          "00:45": [1, 1, 2, 3, 0],
          "00:50": [1, 1, 2, 2, 0],
          "00:55": [1, 1, 2, 1, 0],
        },
        maxBinSize: 14,
      },
      Mandarin: {
        name: "Mandarin (Simplified)",
        words: [
          "\u5341\u4e24 \u4e00 \u4e24 \u4e09 \u56db \u4e94 \u516d \u4e03 \u516b \u4e5d \u5341 \u5341\u4e00".split(
            " "
          ),
          ["\u70b9"],
          ["\u949f"],
          ["\u4e24", "\u4e09", "\u56db", "\u4e94"],
          ["\u5341"],
          ["\u4e94"],
          ["\u5206"],
          ["\u3002"],
        ],
        rules: [
          [0, 1, 1, 0, 0, 0, 0, 1],
          [0, 1, 0, 0, 0, 1, 1, 1],
          [0, 1, 0, 0, 1, 0, 1, 1],
          [0, 1, 0, 0, 1, 1, 1, 1],
          [0, 1, 0, 1, 1, 0, 1, 1],
          [0, 1, 0, 1, 1, 1, 1, 1],
          [0, 1, 0, 2, 1, 0, 1, 1],
          [0, 1, 0, 2, 1, 1, 1, 1],
          [0, 1, 0, 3, 1, 0, 1, 1],
          [0, 1, 0, 3, 1, 1, 1, 1],
          [0, 1, 0, 4, 1, 0, 1, 1],
          [0, 1, 0, 4, 1, 1, 1, 1],
        ],
        hourRule: 0,
        nofill: !0,
        maxBinSize: 6,
      },
    },
  };