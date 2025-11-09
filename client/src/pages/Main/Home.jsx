import React from "react";
import { Hero } from "../../components/Hero";
import { Features } from "../../components/Features";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
    return (
        <div className="">
            <Hero />
            <Features />
            <div className="fixed bottom-10 right-0 m-10">
                <Link to="create-post">
                    <Button
                        variant=""
                        size="icon-xl"
                        className="rounded-full cursor-pointer"
                    >
                        <Plus />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
