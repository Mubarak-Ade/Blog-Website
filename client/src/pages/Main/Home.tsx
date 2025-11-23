import React from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/layout/Home/Features";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { Trending } from "@/components/layout/Home/Trending";
import { Category } from "@/components/layout/Home/Category";
import { Footer } from "@/components/layout/Home/Footer";

const Home = () => {
    return (
        <div className="">
            <Hero />
            <Features />
            <Trending />
            <Category />
            <Footer />
            <div className="fixed bottom-10 right-0 m-10">
                <Link to="create-post">
                    <Button
                        variant="default"
                        size="icon"
                        className="rounded-full bg-custom-400 shadow-2xl size-12 border border-custom-200 hover:bg-custom-200/80 cursor-pointer"
                    >
                        <Plus />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
