from typing import Any, Dict, List

class Part2():

  def __init__(self):
    self._day = '1'
    self._lines = []
    with open(f"src/_2024/day{self._day}/part2_input.txt") as part1_file:
        for line in part1_file:
          self._lines.append(line.strip())
        
  def compute(self) -> int:
    return len(self._lines)