from typing import Any, Dict, List

class Part1():

  def __init__(self):
    self._day = '4'
    self._lines = []
    with open(f"src/_2025/day{self._day}/part1_input.txt") as part1_file:
      for line in part1_file:
        self._lines.append(line.strip())
        
  def compute(self) -> int:
    lines_len = len(self._lines)
    forklift_rolls = 0

    for line_id in range(lines_len):
      if line_id == 0 or line_id == lines_len - 1:
        d
      else:

      

    return forklift_rolls
  
  def count_adj_up(self, line_id, char_id) -> int:
    lines_len = len(self._lines)
    theline_len = len(self._lines[line_id])
    count = 0

    if line_id > 0 and line_id < lines_len :
      if char_id == 0:
        count += 
      
      char_id < theline_len - 1:


    return count