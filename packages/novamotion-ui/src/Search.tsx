import React, { useId, useState } from "react";

export type SearchBarProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (query: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function SearchBar({
  value,
  defaultValue = "",
  onChange,
  onSearch,
  placeholder = "Search anything...",
  label = "Search",
  disabled = false,
  className = "",
}: SearchBarProps) {
  const inputId = useId();
  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const query = value ?? internalQuery;

  const updateQuery = (nextQuery: string) => {
    if (value === undefined) setInternalQuery(nextQuery);
    onChange?.(nextQuery);
  };

  return (
    <form
      role="search"
      aria-label={label}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(query.trim());
      }}
      className={`flex w-full max-w-[420px] items-center gap-2 rounded-xl border border-black/[0.08] bg-white p-2 pl-3 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-shadow focus-within:border-[#A1A1AA] focus-within:shadow-[0_8px_28px_rgba(0,0,0,0.09)] ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <svg
        aria-hidden="true"
        className="shrink-0 text-[#71717A]"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7.5" />
        <path d="m20.5 20.5-4.2-4.2" />
      </svg>
      <input
        id={inputId}
        type="text"
        role="searchbox"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-[#18181B] outline-none placeholder:text-[#A1A1AA] disabled:cursor-not-allowed disabled:opacity-60"
      />
      {query && (
        <button
          type="button"
          aria-label="Clear search"
          disabled={disabled}
          onClick={() => updateQuery("")}
          className="grid size-8 shrink-0 place-items-center rounded-lg text-[#71717A] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B] disabled:cursor-not-allowed"
        >
          <svg
            aria-hidden="true"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      )}
      <button
        type="submit"
        disabled={disabled}
        aria-label="Submit search"
        className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#18181B] text-white transition-colors hover:bg-[#3F3F46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7.5" />
          <path d="m20.5 20.5-4.2-4.2" />
        </svg>
      </button>
    </form>
  );
}

export type AutocompleteOption = {
  label: string;
  value: string;
  description?: string;
};

export type AutocompleteSearchProps = {
  options?: AutocompleteOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (query: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  placeholder?: string;
  label?: string;
  className?: string;
};

const DEFAULT_OPTIONS: AutocompleteOption[] = [
  { label: "Dashboard", value: "dashboard", description: "Overview and key metrics" },
  { label: "Design system", value: "design-system", description: "Tokens, styles, and components" },
  { label: "Motion components", value: "motion-components", description: "Interactive UI patterns" },
  { label: "API documentation", value: "api-documentation", description: "Integration guides and references" },
];

export function AutocompleteSearch({
  options = DEFAULT_OPTIONS,
  value,
  defaultValue = "",
  onChange,
  onSelect,
  placeholder = "Search projects...",
  label = "Search suggestions",
  className = "",
}: AutocompleteSearchProps) {
  const inputId = useId();
  const listId = useId();
  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const query = value ?? internalQuery;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = options
    .filter((option) =>
      `${option.label} ${option.value} ${option.description ?? ""}`
        .toLowerCase()
        .includes(normalizedQuery)
    )
    .slice(0, 6);

  const updateQuery = (nextQuery: string) => {
    if (value === undefined) setInternalQuery(nextQuery);
    onChange?.(nextQuery);
    setActiveIndex(-1);
  };

  const selectOption = (option: AutocompleteOption) => {
    updateQuery(option.label);
    setIsOpen(false);
    onSelect?.(option);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && filteredOptions.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) =>
        index < 0 ? 0 : Math.min(index + 1, filteredOptions.length - 1)
      );
    } else if (event.key === "ArrowUp" && filteredOptions.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) =>
        index < 0 ? filteredOptions.length - 1 : Math.max(index - 1, 0)
      );
    } else if (event.key === "Enter" && isOpen && filteredOptions.length) {
      event.preventDefault();
      selectOption(filteredOptions[activeIndex] ?? filteredOptions[0]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative w-full max-w-[420px] ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-shadow focus-within:border-[#A1A1AA] focus-within:shadow-[0_8px_28px_rgba(0,0,0,0.09)]">
        <svg
          aria-hidden="true"
          className="shrink-0 text-[#71717A]"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7.5" />
          <path d="m20.5 20.5-4.2-4.2" />
        </svg>
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && filteredOptions.length > 0}
          aria-controls={
            isOpen && filteredOptions.length ? listId : undefined
          }
          aria-activedescendant={
            isOpen && filteredOptions[activeIndex]
              ? `${listId}-option-${activeIndex}`
              : undefined
          }
          aria-label={label}
          value={query}
          onChange={(event) => {
            updateQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#18181B] outline-none placeholder:text-[#A1A1AA]"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => updateQuery("")}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-[#71717A] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B]"
          >
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-black/[0.07] bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={`${option.value}-${index}`}
              id={`${listId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectOption(option)}
              className={`cursor-pointer rounded-lg px-3 py-2.5 ${
                index === activeIndex
                  ? "bg-[#F4F4F5]"
                  : "hover:bg-[#FAFAFA]"
              }`}
            >
              <span className="block text-[13px] font-medium text-[#18181B]">
                {option.label}
              </span>
              {option.description && (
                <span className="mt-0.5 block text-[11px] text-[#71717A]">
                  {option.description}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {isOpen && query && filteredOptions.length === 0 && (
        <p
          role="status"
          className="absolute inset-x-0 top-[calc(100%+8px)] z-20 rounded-xl border border-black/[0.07] bg-white px-4 py-3 text-sm text-[#71717A] shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          No suggestions found.
        </p>
      )}
    </div>
  );
}
