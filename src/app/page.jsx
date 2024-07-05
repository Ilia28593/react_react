/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JRRLu3jXUX0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"


export default function Component() {
    const [selectedPosition, setSelectedPosition] = useState("main")
    const [scriptList, setScriptList] = useState([])
    useEffect(() => {
        handlePositionChange(selectedPosition)
    }, [])
    const handlePositionChange = (value) => {
        setSelectedPosition(value)
        fetch("http://localhost:8095/api/scriptList?nameProfile=delete", {method: "GET"})
            .then((response) => response.json())
            .then((data) => setScriptList(data))
    }
    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-1">
                <aside className="w-64 p-4 bg-gray-50 border-r">
                    <nav className="space-y-2">
                        <Link href="#"
                              className="flex items-center gap-2 bg-blue-500 text-white"
                              prefetch={false}
                              onClick={(e) => {
                                  e.preventDefault()
                                  fetch("http://localhost:8094/api/control", {method: "GET"})
                              }}
                        >
                            <PlayIcon className="w-5 h-5"/>
                            Управление
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 bg-blue-500 text-white"
                            prefetch={false}
                            onClick={(e) => {
                                e.preventDefault()
                                fetch("http://localhost:8094/api/scriptList", {method: "GET"})
                            }}
                        >
                            <NewspaperIcon className="w-5 h-5"/>
                            Список скриптов
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-gray-700"
                            prefetch={false}
                            onClick={(e) => {
                                e.preventDefault()
                                fetch("http://localhost:8094/api/scenarion", {method: "GET"})
                            }}
                        >
                            <NewspaperIcon className="w-5 h-5"/>
                            Сценарии
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-gray-700"
                            prefetch={false}
                            onClick={(e) => {
                                e.preventDefault()
                                fetch("http://localhost:8094/api/config", {method: "GET"})
                            }}
                        >
                            <SettingsIcon className="w-5 h-5"/>
                            Настройки
                        </Link>
                    </nav>
                </aside>
                <main className="flex-1 p-4">
                    <div className="mb-4">
                        <Select value={selectedPosition} className="w-full" onValueChange={handlePositionChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select position"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="main">main</SelectItem>
                                <SelectItem value="default">default</SelectItem>
                                <SelectItem value="df12341d">df12341d</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Имя профиля</TableHead>
                                <TableHead>Список скрипта</TableHead>
                                <TableHead>Имя профиля</TableHead>
                                <TableHead>Path ScriptInfo</TableHead>
                                <TableHead>Path DB profile</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scriptList.map((script) => (
                                <TableRow key={script.scriptNo}>
                                    <TableCell>{script.scriptNo}</TableCell>
                                    <TableCell>{script.scriptList}</TableCell>
                                    <TableCell>{script.profileName}</TableCell>
                                    <TableCell>{script.scriptParamPath}</TableCell>
                                    <TableCell>{script.nameDbProfile}</TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Button
                                            onClick={() => {
                                                fetch("http://localhost:8095/api/scriptList/delete?numberScript=" + script.scriptNo, {
                                                    method: "GET"
                                                }),
                                                    window.location.reload();
                                            }}
                                        >
                                            <TrashIcon className="w-5 h-5"/>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                fetch("YOUR_API_URL", {
                                                    method: "PUT",
                                                    body: JSON.stringify({controll: "update"})
                                                })
                                            }
                                        >
                                            <SettingsIcon className="w-5 h-5"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        <Button className="w-full mb-4" variant="default">
                            Добавить дефолтный скрипт
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    )
}

function FileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        </svg>
    )
}


function FilePenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/>
        </svg>
    )
}


function NewspaperIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
            <path d="M18 14h-8"/>
            <path d="M15 18h-5"/>
            <path d="M10 6h8v4h-8V6Z"/>
        </svg>
    )
}


function PlayIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="6 3 20 12 6 21 6 3"/>
        </svg>
    )
}


function SettingsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    )
}


function TrashIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
    )
}