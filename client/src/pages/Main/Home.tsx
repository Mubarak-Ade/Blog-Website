import { Hero } from "@/components/Hero";
import { Category } from "@/components/layout/Home/Category";
import { Features } from "@/components/layout/Home/Features";
import { Trending } from "@/components/layout/Home/Trending";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
    return (
        
        <div className="">
            <Hero />
            <Features />
            <Trending />
            <Category />
            <div className="fixed bottom-10 right-0 m-10">
                <Link to="create-post">
                    <Button
                        variant="default"
                        size="icon"
                        className="rounded-full shadow-2xl size-12 border cursor-pointer"
                    >
                        <Plus />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
