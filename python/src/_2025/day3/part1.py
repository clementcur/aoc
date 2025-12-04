from typing import Any, Dict, List

class Part1():

  def __init__(self):
    self._day = '2'
    self._lines = []
    with open(f"src/_2025/day{self._day}/part1_input.txt") as part1_file:
      for line in part1_file:
        self._lines.append(line.strip())
        
  def compute(self) -> int:
    product_ids = self._lines[0].split(',')

    illegal_ids_sum = 0
    for product_id in product_ids:
      #print(f"product_id={product_id}")

      product_indexes = product_id.split('-')
      product_range = range(int(product_indexes[0]),int(product_indexes[1])+1)

      for product_step in product_range:
        half_index = int(len(str(product_step))/2)
        #(f"half_index={half_index}")
        first_half = str(product_step)[:half_index]
        #print(f"first_half={first_half}")
        second_half = str(product_step)[half_index:]
        #print(f"second_half={second_half}")

        if first_half == second_half:
          illegal_ids_sum += product_step
          #print(f"=>invalid_id={product_step}")
        
    return illegal_ids_sum