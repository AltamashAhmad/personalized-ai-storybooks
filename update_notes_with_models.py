target_path = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/MASTER_PROJECT_BLUEPRINT_AND_NOTES.md"

with open(target_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update story engine references to exact verified models
old_part = "Premium Story Engine (**Claude 3.5 Sonnet / GPT-4o** - Best in class literary prose): 0.25 AED ($0.07)"
new_part = "Primary Story Engine (**Claude Sonnet 5** `claude-sonnet-5` / Fallback **GPT-5.6 Sol** `gpt-5.6-sol`): 0.134 AED ($0.036)"

content = content.replace(old_part, new_part)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated MASTER_PROJECT_BLUEPRINT_AND_NOTES.md with verified model IDs.")
