import { useEffect, useState } from "react";
import styles from "./searchBar.module.css";
import { useDebounce } from "../../hooks/useDebounce.js";
import useQuestions from "../../hooks/useQuestions.js";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
    const { fetchGetBySearch, fetchGetAll } = useQuestions();
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        if (debouncedQuery.trim() !== "") {
            fetchGetBySearch(debouncedQuery, 0, 20);
        } else {
            fetchGetAll(0, 20);
        }

    }, [debouncedQuery]);
    
    return (
        <div className={styles.searchbar_container}>
            <CiSearch className={styles.search_icon} />
            <input
                type="text"
                id="searchbar"
                name="searchbar"
                className={styles.searchbar}
                placeholder="Chercher une question"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    )
}