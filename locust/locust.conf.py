from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 3)
    token = None
    news_id = None

    def on_start(self):
        self.login()

    def login(self):
        response = self.client.post("/authentication", json={
                "strategy": "local",
                "email": "huunghia1810@gmail.com",
            	"password": "111111",
                "bunnyByPass": True
        })
        if response.status_code == 201:
            self.token = response.json().get('accessToken')
            print("Login successful!")
        else:
            print("Login failed!")

    @task
    def get_users(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.client.get("/users", headers=headers)

    @task
    def get_projects(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.client.get("/projects", headers=headers)

    @task
    def patch_project(self):
        project_id = 1
        headers = {"Authorization": f"Bearer {self.token}"}
        self.client.patch(f"/projects/{project_id}", json={
            "status": "1"
        }, headers=headers)

    @task
    def get_news(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.client.get("/news", headers=headers)

    @task
    def create_news(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.client.post("/news", json={
            "newsName": "New News from Locust",
            "description": "[New News from Locust] Test stream has been deprecated"
        }, headers=headers)
        if response.status_code == 201:
            self.news_id = response.json().get('id')
            print(f"News created with ID: {self.news_id}")

    @task
    def patch_news(self):
        if self.news_id:
            headers = {"Authorization": f"Bearer {self.token}"}
            response = self.client.patch(f"/news/{self.news_id}", json={
                "status": "1",
                "description": "[New News from Locust] Edited - Test stream has been deprecated"
            }, headers=headers)
            if response.status_code == 200:
                print(f"News {self.news_id} updated successfully.")

    @task
    def remove_news(self):
        if self.news_id:
            headers = {"Authorization": f"Bearer {self.token}"}
            response = self.client.delete(f"/news/{self.news_id}", headers=headers)
            if response.status_code == 200:
                print(f"News {self.news_id} deleted successfully.")
                self.news_id = None

#locust -f locust.conf.py --host http://localhost:3776
