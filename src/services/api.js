class ApiService {
  constructor() {
    this.ENDPOINT = "https://word-war.herokuapp.com/api";
    // this.ENDPOINT = "http://localhost:5000/api";
  }

  async get(resource) {
    const response = await fetch(`${this.ENDPOINT}/${resource}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async post(resource, body) {
    const response = await fetch(`${this.ENDPOINT}/${resource}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  }

  async getMeaning(word) {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
    );
    if (response.status !== 200) return { error: "Meaningless word" };

    let data = await response.json();
    data = data[0];

    if (
      data.meanings.every((meaning) =>
        ["noun", "abbreviation", "crossReference"].includes(
          meaning.partOfSpeech
        )
      )
    )
      return { error: "Noun/Abbreviation/Cross-Reference is not allowed" };

    return {
      meaning: data.meanings[0].definitions[0].definition,
      speech: data.phonetics[0]?.audio,
    };
  }
}

export default new ApiService();
