using backend.DTOs;
using backend.Models;
using System.Text.Json;

namespace backend.Mappers
{
    public static class GameMappers
    {
        public static string ToRulesFromDTO(this List<RuleDto> rules)
        {
            return JsonSerializer.Serialize(rules, new JsonSerializerOptions
            {
                WriteIndented = true
            });
        }
        public static Game ToGameFromCreateDTO(this GameCreateRequest gameRequest)
        {
            return new Game
            {
                Name = gameRequest.Name,
                Author = gameRequest.Author,
                Rules = ToRulesFromDTO(gameRequest.Rules),
                RangeStart = gameRequest.RangeStart,
                RangeEnd = gameRequest.RangeEnd,
            };
        }
    }
}
