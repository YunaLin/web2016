// shortest path in unweighted graph
//  from the question, we can know that the vertex begin from 1 to n but not 0 to n-1
#include <iostream>
#include <string>
#include <queue>
using namespace std;

int main() {
	int matrix[1001][1001];  // save the relation of edge between two vertexs
	int path[1001];
	for (int i = 0; i < 1001; ++i) {
		for (int j = 0;  j < 1001; ++j) {
			matrix[i][j] = 0;
		}
	}
	int n, m;
	cin >> n >> m;
	int one, another;
	for (int i  = 1; i <= m; ++i) {
		cin >> one;
		cin >> another;
		//  nodirection graph
		matrix[one][another] = 1;
		matrix[another][one] = 1;
	}
	for (int i = 1; i <= n; ++i)  {
		if (i == 1) path[i] = 0;
		else path[i] = -1;
	}
	int num = n;
	int count = 0;
	int distance = 0;
	//  BFS
	queue<int> myQueue;
	myQueue.push(1); // push 1 into the queue firstly
	while (!myQueue.empty()) {
		int num = myQueue.size();
		distance++;
		//  pop the front and push the one that has a edge with the current front
		while (num--) {
			for (int i = 1; i <= n; ++i) {
				if (matrix[myQueue.front()][i] == 1 && path[i] == -1) {
					myQueue.push(i);
					path[i] = distance;
				}
			}
			myQueue.pop();
		}
	}
	for (int i  = 1; i <= n; ++i)
		cout << path[i] << " ";
	cout << endl;
	return 0;
}