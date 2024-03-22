import db from '../../assets/firegase.js'

export async function login() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            created: "",
            firstName: "",
            name: "",
            telegramId: ""
        })

        console.log(docRef.id);
    } catch(e) {
        console.log("Error to login: ", e)
    }
}

/* login

при логіні потрібно порівняти зі всіма користувачами і якщо такий користувач є 
то залогінити



*/