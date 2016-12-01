#include <iostream>
#include <vector>
#include <string.h>
#include <cstring>
using namespace std;
vector<int> forest[200];
int width[200];
int endVertexs[200];
int widthlen, depthlen;
bool isloop;  //  判断给出的图是否连通
bool isvisited[200];

void dfs(int vertex, int level) {
  if (isvisited[vertex]) {
    isloop = false;
    return;
  }
  isvisited[vertex] = true;
  if (level > depthlen) depthlen = level;
  width[level]++;
  if (width[level] > widthlen) widthlen = width[level];
  for (int i = 0; i < forest[vertex].size(); ++i) {
    if (!isloop) return;
    int ver = forest[vertex][i];
    dfs(ver, level+1);
  }
}

int main() {
  int vertexNum, edgeNum;
  while (true) {
    cin >> vertexNum >> edgeNum;
    if (vertexNum == 0)
      break;
    widthlen = depthlen = 0;
    isloop = true;
    for (int i = 0; i < 200; ++i) {
      width[i] = 0;
      endVertexs[i] = 0;
      isvisited[i] = false;
    }
    memset(forest, 0, sizeof(forest));
    int ver1, ver2;
    for (int i = 0; i < edgeNum; ++i) {
      cin >> ver1 >> ver2;
      forest[ver1].push_back(ver2);
      endVertexs[ver2]++;
    }
    for (int i = 1; i <= vertexNum; ++i) {
      if (endVertexs[i] == 0) {
        dfs(i, 0);
      }
    }
    for (int i = 1; i <= vertexNum; ++i) {
      if (!isvisited[i]) isloop = false;
    }
    if (!isloop)
    cout << "INVALID" << endl;
    else
    cout << depthlen << " " << widthlen << endl;
  }
  return 0;
}
