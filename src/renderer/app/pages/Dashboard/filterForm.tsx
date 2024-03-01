function FilterForm() {
    return (
      <form action="/" id="scrapper-form">
        <p>Mode pencarian:</p>
        <div className={`flex gap-3`}>
            <div className={`flex items-center`}>
                <input type="radio" id="keyword" name="query_type" value="keyword"/>
                <label htmlFor="keyword">&nbsp;Pencarian bedasarkan kata kunci</label>
            </div>
            <div className={`flex items-center`}>
                <input type="radio" id="keyword" name="query_type" value="url"/>
                <label htmlFor="keyword">&nbsp;Pencarian bedasarkan url</label>
            </div>
        </div>
      </form>
    )
  }
  
  export default FilterForm;