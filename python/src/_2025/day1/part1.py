from typing import Any, Dict, List

class Part1():

  def __init__(self):
    self._day = '1'
    self._lines = []
    self._pointer = 50
    with open(f"src/_2025/day{self._day}/part1_input.txt") as part1_file:
      for line in part1_file:
        self._lines.append(line.strip())
        
  def compute(self) -> int:
    print(f"pointer={self._pointer}")

    zeroes = 0
    for x in self._lines:
      print(f"line={x}")
      direction = x[0]
      step = int(x[1:len(x)])
      print(f"step={step}")
      move = range(step%100)

      if direction == "L":
        for i in move:
          self._pointer -= 1
          if self._pointer==-1:
            self._pointer = 99
        else:
          zeroes += int(self._pointer == 0)
      else:
        for i in move:
          self._pointer += 1
          if self._pointer==100:
            self._pointer = 0
        else:
          zeroes += int(self._pointer == 0)

      print(f"pointer={self._pointer}")
        
    return zeroes