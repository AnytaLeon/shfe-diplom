export default async function fetchDataLoader() {
  try {
    const res = await fetch("https://shfe-diplom.neto-server.ru/alldata", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch all data");
    }
    return res.json();
  } catch (error) {
    console.error("Ошибка загрузки фильмов", error);
  }
}
