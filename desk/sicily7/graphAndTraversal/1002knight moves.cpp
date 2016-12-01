#include<iostream>
#include<cstdlib>
#include<stdio.h>
#include<queue>
using namespace std;

int moveTo[8][2] = {{1, 2}, {1, -2}, {-1, 2}, {-1, -2},
                    {2, 1}, {2, -1}, {-2, 1}, {-2, -1}};
int chessBoard[8][8];
struct position {
  int x;
  int y;
  int steps;
};
int flag = 1;

bool isValid(int a, int b) {
  if (a >= 0&&a < 8&&b >= 0&&b < 8) return true;
  else return false;
}
bool isEnd(int a, int b, int c, int d) {
  if (a == c && b == d) return true;
  else return false;
}
void bfs(int startX, int startY, int endX, int endY) {
  for (int i = 0; i < 8; i++)
    for (int j = 0; j < 8; j++)
    chessBoard[i][j] = 0;
  chessBoard[startX][startY] = 1;
  flag = 1;
  queue<position> chessStep;
  position p;
  p.x = startX;
  p.y = startY;
  p.steps = 0;
  position tem, temp;
  chessStep.push(p);
  while (!chessStep.empty()) {
    tem = chessStep.front();
    chessStep.pop();
    for (int i = 0; i < 8; i++) {
      temp = tem;
      temp.x += moveTo[i][0];
      temp.y += moveTo[i][1];
      if (isValid(temp.x, temp.y)) {
        if (chessBoard[temp.x][temp.y] == 0) {
          temp.steps++;
          if (isEnd(temp.x, temp.y, endX, endY)) {	    
            cout << "To get from " << char(startX+'a') << startY+1 << " to " <<  char(endX+'a') << endY+1 << " takes " << temp.steps << " knight moves." << endl;
            flag = 0;
            return;
          }
          chessStep.push(temp);
          chessBoard[temp.x][temp.y] = 1;
        }
      }
    }
  }
}
int main() {
  int n;
  char _startx, _endx;
  int _starty, _endy;
  int startx, endx;
  cin >> n;
  while (n--) {
    cin >> _startx >> _starty >> _endx >> _endy;
    _starty -= 1;
    _endy -= 1;
    startx = _startx - 'a';
    endx = _endx - 'a';
    bfs(startx, _starty, endx, _endy);
    if (flag == 1)
	cout << "To get from " << _startx << _starty+1 << " to " << _endx << _endy+1 << " takes 0 knight moves." << endl;
  }
  return 0;
}
