"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Home,
    Users,
    MessageSquare,
    Bell,
    User,
    Search,
    MoreVertical,
    Heart,
    MessageCircle,
    Repeat2,
    Send,
} from "lucide-react";

export default function Component() {
    const [activeTab, setActiveTab] = useState("home");

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return <HomeFeed />;
            case "friends":
                return <FriendsList />;
            case "messages":
                return <Messaging />;
            case "profile":
                return <Profile />;
            case "notifications":
                return <Notifications />;
            default:
                return <HomeFeed />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="flex flex-col w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <NavButton icon={<Home />} isActive={activeTab === "home"} onClick={() => setActiveTab("home")} />
                    <NavButton
                        icon={<Users />}
                        isActive={activeTab === "friends"}
                        onClick={() => setActiveTab("friends")}
                    />
                    <NavButton
                        icon={<MessageSquare />}
                        isActive={activeTab === "messages"}
                        onClick={() => setActiveTab("messages")}
                    />
                    <NavButton
                        icon={<Bell />}
                        isActive={activeTab === "notifications"}
                        onClick={() => setActiveTab("notifications")}
                    />
                    <NavButton
                        icon={<User />}
                        isActive={activeTab === "profile"}
                        onClick={() => setActiveTab("profile")}
                    />
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto">{renderContent()}</main>
        </div>
    );
}

function NavButton({ icon, isActive, onClick }) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 ${isActive ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            onClick={onClick}
        >
            {icon}
        </Button>
    );
}

function HomeFeed() {
    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <Textarea placeholder="What's happening?" className="flex-1" />
                <Button>Post</Button>
            </div>
            <ScrollArea className="h-[calc(100vh-120px)]">
                {[...Array(10)].map((_, i) => (
                    <Post key={i} />
                ))}
            </ScrollArea>
        </div>
    );
}

function Post() {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
            <div className="flex items-center space-x-2 mb-2">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">Username</div>
                    <div className="text-sm text-gray-500">@handle • 2h</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
            <p className="mb-2">
                This is a sample post content. It can be much longer and may include mentions, hashtags, and links.
            </p>
            <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    24
                </Button>
                <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />5
                </Button>
                <Button variant="ghost" size="sm">
                    <Repeat2 className="h-4 w-4 mr-1" />3
                </Button>
            </div>
        </div>
    );
}

function FriendsList() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Friends</h2>
            <Input icon={<Search className="h-4 w-4" />} placeholder="Search friends" className="mb-4" />
            <ScrollArea className="h-[calc(100vh-180px)]">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 mb-4">
                        <Avatar>
                            <AvatarImage src={`/placeholder-user.jpg`} alt={`Friend ${i + 1}`} />
                            <AvatarFallback>F{i + 1}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold">Friend {i + 1}</div>
                            <div className="text-sm text-gray-500">@friend{i + 1}</div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                            Follow
                        </Button>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}

function Messaging() {
    return (
        <div className="flex h-full">
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-2xl font-bold mb-4">Messages</h2>
                <Input icon={<Search className="h-4 w-4" />} placeholder="Search messages" className="mb-4" />
                <ScrollArea className="h-[calc(100vh-180px)]">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
                        >
                            <Avatar>
                                <AvatarImage src={`/placeholder-user.jpg`} alt={`Contact ${i + 1}`} />
                                <AvatarFallback>C{i + 1}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">Contact {i + 1}</div>
                                <div className="text-sm text-gray-500 truncate">Last message preview...</div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold">Contact Name</h3>
                </div>
                <ScrollArea className="flex-1 p-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={`mb-4 ${i % 2 === 0 ? "text-right" : ""}`}>
                            <div
                                className={`inline-block p-2 rounded-lg ${
                                    i % 2 === 0 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                                }`}
                            >
                                This is a sample message.
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Profile() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-4">
                    <div className="flex items-end -mt-16 mb-4">
                        <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800">
                            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 mb-2">
                            <h2 className="text-2xl font-bold">John Doe</h2>
                            <p className="text-gray-500">@johndoe</p>
                        </div>
                    </div>
                    <p className="mb-4">
                        This is a bio. Here you can write about yourself, your interests, or anything else you'd like to
                        share with your followers.
                    </p>
                    <div className="flex space-x-4 mb-4">
                        <div>
                            <span className="font-bold">1,234</span> Following
                        </div>
                        <div>
                            <span className="font-bold">5,678</span> Followers
                        </div>
                    </div>
                    <Button className="w-full">Edit Profile</Button>
                </div>
            </div>
        </div>
    );
}

function Notifications() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <ScrollArea className="h-[calc(100vh-120px)]">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-start space-x-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                    >
                        <Avatar>
                            <AvatarImage src={`/placeholder-user.jpg`} alt={`User ${i + 1}`} />
                            <AvatarFallback>U{i + 1}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">
                                User {i + 1}{" "}
                                {i % 3 === 0
                                    ? "liked your post"
                                    : i % 3 === 1
                                    ? "mentioned you"
                                    : "started following you"}
                            </p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
