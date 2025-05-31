"use client";

import { useSearch } from "@/context/SearchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
    const { search, setSearch } = useSearch();

    return (
        <div className="flex items-center">
            <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs mr-2"
            />
            <Button variant="outline">Search</Button>
        </div>
    );
}
