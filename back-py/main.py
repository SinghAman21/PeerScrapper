from scrapper import scrape_peerlist_projects
def main():
    for _ in range(0,53):
        week_no = 14
        year = 2024
        if week_no > 52:
            week_no = 1
            year += 1
        url = f"https://peerlist.io/launchpad/{year}/week/{week_no}"
        limit = 5
        projects = scrape_peerlist_projects(url, limit)
        
        print(f"Found {len(projects)} projects:")
        print("-" * 40)
        for project in projects:
            print(f"Name: {project['name']}")
            print(f"Publisher: {project['publisher']}")
            print(f"Tagline: {project['tagline']}")
            print(f"Categories: {', '.join(project['categories'])}")
            print(f"Upvotes: {project['upvotes']}")
            print(f"URL: {project['url']}")
            print(f"Direct Link: {project['direct_link']}")
            print(f"Image URL: {project['image_url']}")
            print(f"Detailed Description: {project['detailed_description']}")
            print("-" * 40)

if __name__ == "__main__":
    main()