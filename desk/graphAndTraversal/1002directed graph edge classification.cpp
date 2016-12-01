// 在做dfs时候,当访问一个节点时:
// 1.该节点为被访问过,则此次访问关系边(发起点->接受点)称为树边(tree edge)
// 2.此节点被访问过但此节点的子孙还没访问完,称为back edge(后向边)
// 3.此节点被访问过且此节点的子孙已经访问完,而且发起点是搜索初始边,则称为前向边(down edge)
// 4.此节点被访问过且此节点已经访问完,而且发起点不是搜索初始边,称为横叉边(cross edge)
#include <iostream>
using namespace std;

int isvisit[105];
int pre[105];
int post[105];
int matrix[105][105];
int edgeType[105][105];
int flag = 1;
int temp = 0;
int n, m, k;

void dfs(int num) {
  pre[num] = ++temp;
  for (int i = 1; i <= n; ++i) {
    if (matrix[num][i] == 1) {
      if (pre[i] == 0) {
      // 树边
        edgeType[num][i] = 1;
        dfs(i);
      } else {
      // 后向边
        if (post[i] == 0) {
          edgeType[num][i] = 2;
          flag = 0;
        } else if (pre[i] > pre[num]) {
        // 前向边
          edgeType[num][i] = 3;
        } else {
        // 横叉边
          edgeType[num][i] = 4;
        }
      }
    }
  }
  post[num] = ++temp;
}

int main() {
  while (cin >> n >> m) {
    // 初始化
    temp = 0;
    flag = 1;
    for (int i = 0; i < 105;++i) {
      isvisit[i] = 0;
      pre[i] = post[i] = 0;
    }
    for (int i = 0; i < 105; ++i)
      for (int j = 0; j < 105; ++j)
        matrix[i][j] = edgeType[i][j] = 0;
    //  输入相关边的信息
    int one, another;
    for (int i = 0; i < m; ++i) {
      cin >> one >> another;
      matrix[one][another] = 1;
    }
    dfs(1);

    cin >> k;
    for (int i = 0; i < k; ++i) {
      cin >> one >> another;
      if (edgeType[one][another] == 1)
      cout << "edge (" << one << "," << another << ") is " << "Tree Edge" << endl;
      else if (edgeType[one][another] == 2)
      cout << "edge (" << one << "," << another << ") is " << "Back Edge" << endl;
      else if (edgeType[one][another] == 3)
      cout << "edge (" << one << "," << another << ") is " << "Down Edge" << endl;
      else
      cout << "edge (" << one << "," << another << ") is " << "Cross Edge" << endl;
    }
  }
  return 0;
}
