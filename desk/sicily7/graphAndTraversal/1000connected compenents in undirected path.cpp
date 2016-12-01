// connect components in undirected graph
//  from the question, we can know that the vertex begin from 1 to n but not 0 to n-1
#include <iostream>
#include <string>
#include <queue>
using namespace std;

int main() {
	int matrix[1001][1001];  // save the relation of edge between two vertexs
	int isvisit[1001];
	for (int i = 0; i < 1001; ++i) {
		for (int j = 0;  j < 1001; ++j) {
			matrix[i][j] = 0;
		}
	}
	int n, m;
	cin >> n >> m;
	for (int i = 1; i  <= n;  ++i)
		isvisit[i] = 0;
	int one, another;
	for (int i  = 0; i < m; ++i) {
		cin >> one;
		cin >> another;
		//  nodirection graph
		matrix[one][another] = 1;
		matrix[another][one] = 1;
	}
	int num = n;
	int count = 0;
	//  BFS
	while (num--) {
		queue<int> myQueue;
		for (int i = 1; i <= n; ++i) {
			if (isvisit[i] == 0) {
				myQueue.push(i);
				isvisit[i] = 1;
				count++;
				break;
			}
		}
		while (!myQueue.empty()) {
			int temp = myQueue.front();
			for (int i = 1; i <= n; ++i) {
				if (matrix[temp][i] && !isvisit[i]) {
					myQueue.push(i);
					isvisit[i] = 1;
				}
			}
			myQueue.pop();
		}
	}
	cout << count << endl;
	return 0;
}