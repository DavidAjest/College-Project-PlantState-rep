

import React, { useContext, useEffect, useState } from "react"

import { auth } from "../firebase"
import { database } from "../firebase"
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, getDoc, setDoc, getDocs, doc } from "firebase/firestore"

const AuthContext = React.createContext(null)


export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState()

    const [loading, setLoading] = useState(true)

    const login = async ({ email, password }) => {
        const loginResponse = await signInWithEmailAndPassword(auth, email, password)
        return await getUser(loginResponse.user.uid)
    }

    const register = async (userInfo) => {
        const registerResponse = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        delete userInfo.password
        const newUserDocument = {
            ...userInfo,
            uid: registerResponse.user.uid,
            image: registerResponse.user.photoURL,
            phone: registerResponse.user.phoneNumber,
            isAdmin: false,
        }

        await setDoc(doc(database, `users/${registerResponse.user.uid}`), newUserDocument)
        setUser(newUserDocument)
        return newUserDocument
    }

    const getUser = async (id) => {
        try {
            const snapshot = await getDoc(doc(database, `users/${id}`))
            const user = snapshot.data()
            setUser(user)
            return user 
        } catch (e) { }
    }
    const logout = async () => {
        await signOut(auth)
        setUser(undefined)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (userState) => {
            if (userState) {
                const userDocumentData = await getUser(userState.uid)
                if (userDocumentData) {
                    setUser(userDocumentData)
                }
                setLoading(false)
            }
            else {
                setUser(undefined)
                setLoading(false)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return <AuthContext.Provider value={{ user, loadingUser: loading, login, register, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Auth context not provided")
    }
    return context
}