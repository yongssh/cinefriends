# Documentation

- AWS lambda function:
    - scrapes user profile diary, gets all diary entries and collects: 
        
            entry_data = {
                "date_watched": date_watched,
                "rewatch": rewatch_tag,
                "film_title": film_title,
                "release_year": release_year,
                "review_text": review_text,
                "rating": rating_text,
            }

        all_entries will collect these objects and return them for each user

        
