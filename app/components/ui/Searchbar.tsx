type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="w-full mb-10">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-3 rounded-xl bg-foreground text-2xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}