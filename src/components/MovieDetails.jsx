const MovieDetails = ({
  movie: {
    genres,
    overview,
    release_date,
    production_countries,
    spoken_languages,
    status,
    tagline,
    budget,
    revenue,
    production_companies,
  },
  displayValue,
}) => {
  // Helper to format revenue in millions if needed
  const formatRevenue = (revenue) => {
    if (!revenue || isNaN(revenue)) return "N/A";
    if (revenue >= 1_000_000) {
      return `$${(revenue / 1_000_000).toFixed(1)} Million`;
    }
    return `$${revenue.toLocaleString()}`;
  };

  // Helper to format date as "Month Day, Year"
  const formatFullDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <ul
      className="movie-list grid grid-cols-1 gap-y-6 gap-x-10"
      style={{ maxWidth: "800px", width: "100%" }}
    >
      <li className="flex items-center">
        <p className="text-light-200 min-w-[140px]">Generes</p>
        {genres && genres.length > 0 ? (
          genres.map((genre) => (
            <span key={genre.id}>
              <p className="text-white font-semibold bg-blue-100 p-2 mr-2 rounded-md">
                {displayValue(genre.name)}
              </p>
            </span>
          ))
        ) : (
          <p className="data-info">N/A</p>
        )}
      </li>
      <li className="flex ">
        <p className="text-light-200 min-w-[140px]">Overview</p>
        <p className="text-white leading-relaxed">{displayValue(overview)}</p>
      </li>
      <li className="flex">
        <p className="text-light-200 min-w-[140px]">Release date</p>
        <p className="data-info">{formatFullDate(release_date)}</p>
      </li>
      <li className="flex ">
        <p className="text-light-200 min-w-[140px]">Countries</p>
        {production_countries && production_countries.length > 0 ? (
          production_countries.map((countrie, index) => (
            <p key={countrie.id} className="data-info">
              {displayValue(countrie.name)}{" "}
              {index < production_countries.length - 1 && (
                <span className="dot mx-1">•</span>
              )}
            </p>
          ))
        ) : (
          <p className="data-info">N/A</p>
        )}
      </li>
      <li className="flex">
        <p className="text-light-200 min-w-[140px]">Status</p>
        <p className="data-info">{displayValue(status)}</p>
      </li>
      <li className="flex">
        <p className="text-light-200 min-w-[140px]">Language</p>
        {spoken_languages && spoken_languages.length > 0 ? (
          spoken_languages.map((lang, index) => (
            <p key={`lang-${index}`} className="data-info gap-2">
              {lang.english_name}
              {index < spoken_languages.length - 1 && (
                <span className="dot mx-1">•</span>
              )}
            </p>
          ))
        ) : (
          <p className="data-info">N/A</p>
        )}
      </li>
      <li className="flex ">
        <p className="text-light-200 min-w-[140px]">Budget</p>
        <p className="data-info">{formatRevenue(budget)}</p>
      </li>
      <li className="flex ">
        <p className="text-light-200 min-w-[140px]">Revenue</p>
        <p className="data-info">{formatRevenue(revenue)}</p>
      </li>
      <li className="flex ">
        <p className="text-light-200 min-w-[140px]">Tagline</p>
        <p className="data-info">{displayValue(tagline)}</p>
      </li>
      <li className="flex gap-y-1">
        <p className="text-light-200 max-w-[140px]">Productions Companies</p>
        <div className="flex flex-wrap gap-x-2">
          {production_companies && production_companies.length > 0 ? (
            production_companies.map((company, index) => (
              <p key={company.id} className="data-info">
                {displayValue(company.name)}
                {index < production_companies.length - 1 && (
                  <span className="dot mx-1">•</span>
                )}
              </p>
            ))
          ) : (
            <p className="data-info ml-2">N/A</p>
          )}
        </div>
      </li>
    </ul>
  );
};

export default MovieDetails;
